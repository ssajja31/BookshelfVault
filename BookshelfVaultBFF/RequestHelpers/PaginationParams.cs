﻿namespace BookshelfVaultBFF.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 25;

        public int PageNumber { get; set; } = 1;

        private int _pageSize { get; set; } = 100;

        public int PageSize 
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}
