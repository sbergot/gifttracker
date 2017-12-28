namespace WebApplication.Models
{
    public class Gift
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int PriceInCents { get; set; }

        public string Url { get; set; }

        public int OwnerId { get; set; }

        public Individual Owner { get; set; }

        public int? ReceiverId { get; set; }

        public Individual Receiver { get; set; }

        public int? EventId { get; set; }

        public Event Event { get; set; }
    }
}
