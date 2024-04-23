using Demo_c_.Models;
using Microsoft.AspNetCore.Mvc;


namespace Demo_c_.Services.Interfaces
{
    public interface IUsersServices
    {
        public Task<List<UsersModels>> GetAllUsers();
        public Task<UsersModels> GetUsersByID(int id);
        public Task CreateUsers(UsersModels dataCandidate);
        public Task UpdateUsers(int id, UsersModels dataCandidate);
        public Task DeleteUsersByID(int id);
    }
}
