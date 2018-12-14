namespace WebApplication.Models.WebApi
{
    using System.ComponentModel.DataAnnotations;

    public class Gift
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public int PriceInCents { get; set; }

        public string Url { get; set; }

        public int OwnerId { get; set; }

        public int? BuyerId { get; set; }

        public int? EventId { get; set; }

        [RegularExpression(@"^(None|Reserved|Bought)$")]
        public string Status { get; set; }

        public bool? IsVisibleToOthers { get; set; }
    }
}
