#include <bits/stdc++.h>
#include <iostream>
using namespace std;
int lenOfLongSubarr(int arr[], int n, int k)
{
    // Complete the function
    int currsum = 0, ans = 0;
    unordered_map<int, int> ourmap;
    for (int i = 0; i < n; i++)
    {
        currsum += arr[i];
        if (k == currsum)
        {
            ans = max(ans, i + 1);
        }
        if (ourmap.find(currsum - k) != ourmap.end())
        {
            ans = max(ans,i-ourmap[currsum-k]);
        }
        if (ourmap.find(currsum) == ourmap.end())
        {
            ourmap[currsum] = arr[i];
        }
    }
    return ans;
}
