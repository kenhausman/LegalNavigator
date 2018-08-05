﻿using Access2Justice.Shared.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.Azure.Documents;

namespace Access2Justice.Shared.Interfaces
{
    public interface IUserProfileBusinessLogic
    {
        Task<UserProfile> GetUserProfileDataAsync(string oId);
        Task<dynamic> GetUserResourceProfileDataAsync(string oId);
        Task<int> CreateUserProfileDataAsync(UserProfile userProfile);
        Task<int> UpdateUserProfileDataAsync(UserProfile userProfile, string useroId);
        Task<object> CreateUserPersonalizedPlanAsync(dynamic userData);
        Task<object> UpdateUserPersonalizedPlanAsync(string id, dynamic userData);
        Task<object> UpsertUserPersonalizedPlanAsync(dynamic userData);
        Task<object> UpsertUserPlanAsync(dynamic userPlan);
        Task<object> UpdateUserProfileDataAsync(UserProfile userProfile);
        Task<object> ShareResourceDataAsync(ShareInput shareInput);
        Task<object> UnshareResourceDataAsync(UnShareInput shareInput);
        Task<object> GetPermaLinkDataAsync(string permaLink);
    }
}