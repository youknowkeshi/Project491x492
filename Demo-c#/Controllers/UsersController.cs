using Microsoft.AspNetCore.Http;
using Demo_c_.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Demo_c_.Models;

namespace Demo_c_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IUsersServices _servicesUsers;
        public UsersController(IUsersServices servicesUsers)
        {
            _servicesUsers = servicesUsers;
        }
        [HttpGet]
        public async Task<List<UsersModels>> GetAllUsers()
        {
            return await _servicesUsers.GetAllUsers();
        }
    }
}
