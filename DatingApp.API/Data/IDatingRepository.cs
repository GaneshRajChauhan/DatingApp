using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveALl();

        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<User> GetUser(int Id);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Like> GetLike(int uerId, int recipientId);
        Task <Message> GetMessage (int id);
        Task <PagedList<Message>> GetMessageForUser(MessageParams messageParams);
        Task <IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}