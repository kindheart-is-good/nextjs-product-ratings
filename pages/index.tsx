import { useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import { withLayout } from "@/layout/Layout";
import { Button, Htag, P, Tag, Rating } from "../components";
import { MenuItem } from "@/interfaces/menu.interface";

export function Home({ menu }: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4);

    return (
        //<Layout>
        <>
            <Htag tag="h1">Test</Htag>
            <Button appearance="primary" arrow="right">
                Кнопка
            </Button>
            <Button appearance="ghost" arrow="down">
                Кнопка
            </Button>
            <P size="s">Мелкий</P>
            <P>Средний</P>
            <P size="l">Большой</P>
            <Tag size="s">Ghost</Tag>
            <Tag size="m" color="red">
                red
            </Tag>
            <Tag size="s" color="grey">
                grey
            </Tag>
            <Tag size="m" color="green">
                green
            </Tag>
            <Tag size="s" color="primary">
                primary
            </Tag>
            <Rating rating={3} />
            <Rating rating={rating} isEditable setRating={setRating} />
        </>
        //</Layout>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;    // Захардкодил, потому что в случае данной ServerAPI эта страница всегда будет относиться к категории 0

    const { data: menu } = await axios.post<MenuItem[]>(    // 2 параметра: url и body
        process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
        {
            firstCategory,
        }
    );

    return {
        props: {
            menu,
            firstCategory,
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
