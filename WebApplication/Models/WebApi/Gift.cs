namespace WebApplication.Models.WebApi
{
    using System.ComponentModel.DataAnnotations;

    public class Gift
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int PriceInCents { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public int OwnerId { get; set; }

        public Individual Owner { get; set; }

        [Required]
        public int? BuyerId { get; set; }

        public Individual Buyer { get; set; }

        [Required]
        public int? EventId { get; set; }

        public Event Event { get; set; }

        [Required]
        public GiftStatus Status { get; set; }

        [Required]
        public bool? IsVisibleToOthers { get; set; }
    }
}
