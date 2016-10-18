namespace WebApplication.Models
{
    public class Gift
    {
        public int Id { get; set; }

        public int ApplicationUserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}
