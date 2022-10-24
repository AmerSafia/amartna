import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient(
    {
        projectId: 'txe0s5w5',
        dataset: 'production',
        apiVersion: '2022-10-24',
        useCdn: true,
        token:process.env.TOKEN_SANITY
    }
)
const builder = imageUrlBuilder(client)
export const urlFor = (source) =>  builder.image(source)