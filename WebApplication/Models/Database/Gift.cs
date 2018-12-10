namespace WebApplication.Models.Database
{
    using System.ComponentModel.DataAnnotations;

    public class Gift
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int PriceInCents { get; set; }

        public string Url { get; set; }

        public int OwnerId { get; set; }

        public Individual Owner { get; set; }

        public int? BuyerId { get; set; }

        public Individual Buyer { get; set; }

        public int? EventId { get; set; }

        public Event Event { get; set; }

        public GiftStatus Status { get; set; }

        public bool? IsVisibleToOthers { get; set; }
    }
}
