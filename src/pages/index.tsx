import { useState } from "react"
import type { NextPage, GetServerSideProps } from "next"

interface CatCategory {
    id: number
    name: string
}

interface SearchCatImage {
    breeds: string[]
    catCategories: CatCategory[]
    id: string
    url: string
    width: number
    height: number
}

type SearchCatImageResponse = SearchCatImage[]

const fetchCatImage = async (): Promise<SearchCatImage> => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search")
    const result = (await response.json()) as SearchCatImageResponse
    return result[0]
}

interface IndexPageProps {
    initialCatImageUrl: string
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
    const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl)
    const handleClick = async (): Promise<void> => {
        const image = await fetchCatImage()
        setCatImageUrl(image.url)
    }

    return (
        <div>
            <button onClick={handleClick}>🐱 Fetch New Cat Image 🐱</button>
            <div style={{ marginTop : 8 }}>
                <img src={catImageUrl} width={500} height="auto" />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const catImage = await fetchCatImage()
    return {
        props: {
            initialCatImageUrl: catImage.url,
        }
    }
}

export default IndexPage
