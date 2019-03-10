const { GraphQLServer } = require('graphql-yoga');

// 1
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find(l => l.id === args.id),
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      
      const index = links.findIndex(l => l.id === args.id);
      console.log(index);
      
      
      links[index] = {
        id: args.id,
        url: args.url || links[index].url,
        description: args.description || links[index].description,
      }
      return links[index];
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex(l => l.id == args.id);
      const link = links[index];
      links.splice(index, 1);
      console.log(links);
      console.log(index);
      
      return link;
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));