using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace NewsService.Models
{
    /// <summary>
    /// Class fascilitating communication with database
    /// </summary>
    public class NewsContext
    {
        /// <summary>
        /// Represents the mongo client
        /// </summary>
        readonly MongoClient mongoClient;

        /// <summary>
        /// Represents the database that we operate upon
        /// </summary>
        readonly IMongoDatabase mongoDb;

        /// <summary>
        /// Constructor receiving the configuration file details and initialising mongo entities
        /// </summary>
        /// <param name="configuration"></param>
        public NewsContext(IConfiguration configuration)
        {
            string client = Environment.GetEnvironmentVariable("MongoCon");
            string db = Environment.GetEnvironmentVariable("Db");

            if (client == null)
            {
                client = configuration.GetSection("MongoDB").GetSection("ConnectionString").Value;
            }

            if (db == null)
            {
                db = configuration.GetSection("MongoDB").GetSection("NewsDatabase").Value;
            }
            //Initialize client with connection string
            mongoClient = new MongoClient(client);
            //Initialize database using database name
            mongoDb = mongoClient.GetDatabase(db);
        }

        /// <summary>
        /// Represents the News Collection in database
        /// </summary>
        public IMongoCollection<UserNews> News => mongoDb.GetCollection<UserNews>("userNews");
    }
}
