import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Car({ car }) {

    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            <Head>
                <title>{id}</title>
            </Head>

            <main>
                <h1>
                    HELLO {car.name}
                </h1>


            </main>
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data },
    }
}