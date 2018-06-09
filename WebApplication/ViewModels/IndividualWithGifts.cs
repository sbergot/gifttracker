namespace WebApplication.ViewModels
{
    using System.Collections.Generic;
    using WebApplication.Models;

    public class IndividualWithGifts
    {
        public Individual Individual { get; set; }
        public List<Gift> Gifts { get; set; }
    }
}