namespace WebApplication.Models
{
    public class Occurence
    {
        public int Id { get; set; }

        public int ReceiverId { get; set; }

        public int Year { get; set; }

        public OccurenceType Type { get; set; }
    }
}
