namespace WebApplication.Models.Database
{
    public class UserMail
    {
        public string Mail { get; set; }

        public int IndividualId { get; set; }

        public Individual Individual { get; set; }
    }
}
