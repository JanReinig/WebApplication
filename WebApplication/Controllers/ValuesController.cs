using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class Person
    {
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string City { get; set; }

        [BsonId]
        public ObjectId _id { get; set; }
    }

    public class ValuesController : ApiController
    {
        private MongoClient client = new MongoClient("mongodb://localhost:27017");

        [Route("api/persons")]
        [HttpGet]
        public IList<Person> GetPersons()
        {
            IMongoDatabase database = client.GetDatabase("test");
            IMongoCollection<Person> collection = database.GetCollection<Person>("persons");
            return collection.Find(new BsonDocument()).ToList();
        }

        [Route("api/personsByFirstName")]
        [HttpGet]
        public IList<Person> GetPersonsByFirstName(string firstName)
        {
            IMongoDatabase database = client.GetDatabase("test");
            IMongoCollection<Person> collection = database.GetCollection<Person>("persons");
            var query = Builders<Person>.Filter.Eq("FirstName", firstName);
            return collection.Find(query).ToList();
        }

        [Route("api/personCount")]
        [HttpGet]
        public long GetPersonCount()
        {
            var database = client.GetDatabase("test");
            var collection = database.GetCollection<Person>("persons");
            return collection.Count(new BsonDocument());
        }

        [Route("api/person/{id}")]
        [HttpGet]
        public Person GetPerson(string id)
        {
            ObjectId id2 = new ObjectId(id);
            var database = client.GetDatabase("test");
            var collection = database.GetCollection<Person>("persons");
            var query = Builders<Person>.Filter.Eq("_id", id2);
            return collection.Find(query).FirstOrDefault();
        }

        [Route("api/person")]
        [HttpPost]
        public void PutPerson(Person person)
        {
            var database = client.GetDatabase("test");
            var collection = database.GetCollection<Person>("persons");
            collection.InsertOne(person);
        }

        [Route("api/person/{id}")]
        [HttpDelete]
        public void Delete(string id)
        {
            ObjectId id2 = new ObjectId(id);
            var database = client.GetDatabase("test");
            var collection = database.GetCollection<Person>("persons");
            var query = Builders<Person>.Filter.Eq("_id", id2);
            collection.DeleteOne(query);
        }

        [Route("api/persons")]
        [HttpDelete]
        public void Delete()
        {
            var database = client.GetDatabase("test");
            var collection = database.GetCollection<Person>("persons");
            collection.DeleteMany(new BsonDocument());
        }
    }
}