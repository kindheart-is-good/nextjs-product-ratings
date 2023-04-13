import { GetStaticProps } from "next";
import axios from "axios";
import { withLayout } from "@/layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";

function Search(): JSX.Element {
    return (
        <>
			Search
        </>
    );
}

export default withLayout(Search);

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
