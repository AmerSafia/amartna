import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient(
    {
        projectId: 'txe0s5w5',
        dataset: 'production',
        apiVersion: '2022-10-24',
        useCdn: true,
        token:'skPKHRzHAAxZV74SQZCihvyAL7JZdAmEn2ghB2UFhLJHg7rpgB9iQ54VEiHJyMqskJRmlt2v4eEdmhqeqe7ktzWydBo8aW1NoBJumi7dLCx7jPOdnyhCxPhNfXQT0uhLrx695Qh9Bv3B4INXAbFzo4ZcxTzq1fSzkG9IrRQSiygQfTJX9FkK'
    }
)
const builder = imageUrlBuilder(client)
export const urlFor = (source) =>  builder.image(source)