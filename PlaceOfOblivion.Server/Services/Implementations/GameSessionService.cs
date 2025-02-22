using PlaceOfOblivion.Server.Models.Domain;
using PlaceOfOblivion.Server.Repositories.Interfaces;
using PlaceOfOblivion.Server.Services.Interfaces;

namespace PlaceOfOblivion.Server.Services.Implementations
{
    public class GameSessionService : IGameSessionService
    {
        private readonly IGameSessionRepository _gameSessionRepository;
        private readonly IUserBalanceService _userBalanceService;
        private readonly Random _random = new Random();
        private const decimal BetAmount = 10m;

        public GameSessionService(IGameSessionRepository gameSessionRepository, IUserBalanceService userBalanceService)
        {
            _gameSessionRepository = gameSessionRepository;
            _userBalanceService = userBalanceService;
        }

        public async Task<GameSession> PlayGameAsync(int userId)
        {
            var balance = await _userBalanceService.GetUserBalanceAsync(userId);
            if (balance.Balance < BetAmount)
            {
                throw new InvalidOperationException("Insufficient balance");
            }

            string symbols = GenerateSymbols();
            bool isWin = CheckWinCondition(symbols);
            decimal prize = isWin ? CalculatePrize(symbols) : 0m;

            await _userBalanceService.UpdateUserBalanceAsync(userId, -BetAmount + prize);

            var gameSession = new GameSession
            {
                UserId = userId,
                Symbols = symbols,
                IsWin = isWin,
                Prize = prize,
                PlayedAt = DateTime.UtcNow
            };

            await _gameSessionRepository.AddAsync(gameSession);
            return gameSession;
        }

        public async Task<IEnumerable<GameSession>> GetUserGameSessionsAsync(int userId)
        {
            return await _gameSessionRepository.FindAsync(t => t.UserId == userId);
        }
        private string GenerateSymbols()
        {
            string[] possibleSymbols = { "A", "B", "C", "D", "E" };
            return string.Join("", Enumerable.Range(0, 3).Select(_ => possibleSymbols[_random.Next(possibleSymbols.Length)]));
        }

        private bool CheckWinCondition(string symbols)
        {
            return symbols.Distinct().Count() == 1;
        }

        private decimal CalculatePrize(string symbols)
        {
            return symbols[0] switch
            {
                'A' => 50m,
                'B' => 30m,
                'C' => 20m,
                'D' => 10m,
                'E' => 5m,
                _ => 0m
            };
        }
        
    }
}
