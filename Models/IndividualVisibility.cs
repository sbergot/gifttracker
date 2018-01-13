namespace WebApplication.Models
{
    public class IndividualVisibility
    {
        public int ViewerId { get; set; }

        public Individual Viewer { get; set; }

        public int ViewedId { get; set; }

        public Individual Viewed { get; set; }
    }
}
