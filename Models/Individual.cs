namespace WebApplication.Models
{
    using System.Collections.Generic;

    public class Individual
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public List<Occurence> Occurences { get; set; }
    }
}
