namespace WebApplication.Models
{
    using System.Collections.Generic;

    public class Occurence
    {
        public int Id { get; set; }

        public int EventId { get; set; }

        public int ReceiverId { get; set; }

        public Individual Receiver { get; set; }

        public List<Gift> Gifts { get; set; }
    }
}
