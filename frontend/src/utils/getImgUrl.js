const getImgUrl = (address, name) => (
    new URL(`../assets/${address}/${name}`, import.meta.url)
)

export {getImgUrl}