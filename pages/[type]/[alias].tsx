import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { ParsedUrlQuery } from "node:querystring";
import axios from "axios";
import { withLayout } from "../../layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { firstLevelMenu } from '@/helpers/helpers';
import { TopPageComponent } from '@/page-components';

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
    return <TopPageComponent 
        firstCategory={firstCategory}
        page={page}
        products={products}
    />;
}

export default withLayout(TopPage);

    // После того как получена информация о Меню, Странице и Продуктах, NextJs не знает какие пути необходимо резолвить для того чтобы построить эту страницу. Для этого использую getStaticPaths:
export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
            {
                firstCategory: m.id,
            }
        );
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    //console.log(paths);
    return {
            // Получив меню, раскладываю его в плоский массив url'ов
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }

    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
    if (!firstCategoryItem) {
        return {
            notFound: true,
        };
    }

    try {
            // Получение данных на странице
            // Получение меню
        const { data: menu } = await axios.post<MenuItem[]>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
            {
                firstCategory: firstCategoryItem.id,
            }
        );
        if (menu.length == 0) {
            return {
                notFound: true,
            };
        }

            // После того как получено меню, получаю страницу
        const { data: page } = await axios.get<TopPageModel>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
        );

            // После того как получена страница, по этой странице можно запросить информацию о продуктах
        const { data: products } = await axios.post<ProductModel[]>(
            process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
            {
                category: page.category,
                limit: 10,
            }
        );

        return {
            props: {
                firstCategory: firstCategoryItem.id,
                menu,
                page,
                products,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}
