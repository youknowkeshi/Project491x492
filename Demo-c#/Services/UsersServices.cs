using Demo_c_.Models;
using Demo_c_.Services.Interfaces;
using Demo_c_.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Demo_c_.Services
{
    public class UsersServices : IUsersServices
    {
        public readonly AppDbContext _appDbContext;
        public readonly IConfiguration _configuration;

        public UsersServices(AppDbContext appDbContext, IConfiguration configs)
        {
            _appDbContext = appDbContext;
            _configuration = configs;
        }
        public Task CreateUsers(UsersModels dataCandidate)
        {
            throw new NotImplementedException();
        }

        public Task DeleteUsersByID(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<UsersModels>> GetAllUsers()
        {
            return await _appDbContext.users.ToListAsync();
        }


        public Task<UsersModels> GetUsersByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUsers(int id, UsersModels dataCandidate)
        {
            throw new NotImplementedException();
        }
    }
}
