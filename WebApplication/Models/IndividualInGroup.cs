namespace WebApplication.Models
{
    public class IndividualInGroup
    {
        public int IndividualId { get; set; }

        public Individual Individual { get; set; }

        public int GroupId { get; set; }

        public IndividualGroup Group { get; set; }
    }
}
