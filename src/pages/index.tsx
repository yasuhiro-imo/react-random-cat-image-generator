import { useState } from "react"

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

const IndexPage = (): JSX.Element => {
    const [catImageUrl, setCatImageUrl] = useState("https://cdn2.thecatapi.com/images/bpc.jpg")
    const handleClick = async (): Promise<void> => {
        const image = await fetchCatImage()
        setCatImageUrl(image.url)
    }

    return (
        <div>
            <button onClick={handleClick}>🐱 Fetch New Cat Image 🐱</button>
            <div style={{ marginTop : 8 }}>
                <img src={catImageUrl} />
            </div>
        </div>
    )
}

export default IndexPage
