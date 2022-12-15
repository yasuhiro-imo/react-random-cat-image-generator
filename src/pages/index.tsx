import { useState } from "react"

const fetchCatImage = async () => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search")
    const result = (await res.json())
    return result[0]
}

const IndexPage = () => {
    const [catImageUrl, setCatImageUrl] = useState("https://cdn2.thecatapi.com/images/bpc.jpg")
    const handleClick = async () => {
        const image = await fetchCatImage()
        setCatImageUrl(image.url)
    }

    return (
        <div>
            <button onClick={handleClick}>🐱 Generate New Cat Image 🐱</button>
            <div style={{ marginTop : 8 }}>
                <img src={catImageUrl} />
            </div>
        </div>
    )
}

export default IndexPage
