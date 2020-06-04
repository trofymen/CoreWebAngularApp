using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreWebAngularApplication.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Product[] products = { 
                new Product { Id = 1, Name = "iPhone X", Company = "Apple", Price = 79900 },
                new Product { Id = 2, Name = "Galaxy S8", Company = "Samsung", Price = 49900 },
                new Product { Id = 3, Name = "Pixel 2", Company = "Google", Price = 52900 }
            };

            Person[] persons =
            {
                new Person { Id = 1, Login = "admin@gmail.com", Password = "12345", Role = "admin" },
                new Person { Id = 2, Login = "qwerty@gmail.com", Password = "55555", Role = "user" },
                new Person { Id = 3, Login = "qwerty2@gmail.com", Password = "77777", Role = "user" }
        };

            modelBuilder.Entity<Product>().HasData(products);
            modelBuilder.Entity<Person>().HasData(persons);
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Person> Persons { get; set; }
    }
}
