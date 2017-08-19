using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace WebApplication.ViewModels.ManageViewModels
{
    public class IndexViewModel
    {
        public IList<UserLoginInfo> Logins { get; set; }
    }
}
