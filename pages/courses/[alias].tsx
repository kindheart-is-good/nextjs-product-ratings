import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import { withLayout } from "../../layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";

const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
    return (
        <>
            {products && products.length}
        </>
    );
}

export default withLayout(Course);

    // После того как получена информация о Меню, Странице и Продуктах, NextJs не знает какие пути необходимо резолвить для того чтобы построить эту страницу. Для этого использую getStaticPaths:
export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        {
            firstCategory,
        }
    );

    return {
            // Получив меню, раскладываю его в плоский массив url'ов
        paths: menu.flatMap(m => m.pages.map(p => "/courses/" + p.alias)),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true,
        };
    }

        // Получение данных на странице
        // Получение меню
    const { data: menu } = await axios.post<MenuItem[]>(
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        {
            firstCategory,
        }
    );

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
            firstCategory,
            menu,
            page,
            products,
        },
    };
};

interface CourseProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel;
    products: ProductModel[];
}
