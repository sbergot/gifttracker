namespace WebApplication.Filters
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.AspNetCore.Mvc;

    class ModelValidationFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var list = (
                    from modelState in context.ModelState.Values 
                    from error in modelState.Errors
                    select error
                    ).ToList();
                context.Result = new BadRequestObjectResult(list);
            }

            base.OnActionExecuting(context);
        }
     }
}