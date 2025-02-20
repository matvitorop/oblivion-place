using Microsoft.EntityFrameworkCore;
using PlaceOfOblivion.Server.Data;
using PlaceOfOblivion.Server.Repositories.Interfaces;
using System.Diagnostics;
using System.Linq.Expressions;

namespace PlaceOfOblivion.Server.Repositories.Implementations
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly POODbContext _context;

        public Repository(POODbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }
        public async Task<T?> FindOneAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWhereAsync(Expression<Func<T, bool>> predicate)
        {
            var entities = await _context.Set<T>().Where(predicate).ToListAsync();
            if (entities.Any())
            {
                _context.Set<T>().RemoveRange(entities);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<T?> GetWithIncludesAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(predicate);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().AnyAsync(predicate);
        }
    }
}
