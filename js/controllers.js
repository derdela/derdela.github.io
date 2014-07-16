var blogApp = angular.module('blogApp', []);

blogApp.controller('BlogListCtrl',['$scope', '$http',
       function ($scope, $http) {
            $http.get('reddit_feed.json').success(function(data) {
                posts = extract_posts(data);
                $scope.posts = posts;
                $scope.categorys = extract_categorys_from_posts(posts);
                $scope.post_order = '-created';
                $scope.category_order = '-size';
            });
        }
    ]
);


function extract_posts(reddit_json) {
    posts = [];
    reddit_json.data.children.forEach(function (child) {posts.push(child.data);});
    return posts;
}

function extract_categorys_from_posts(posts) {
    categorys_dict = {};
    posts.map(function(post) {
        key = post.subreddit;
        if (!(key in categorys_dict)) {
            categorys_dict[key] = [];
        }
        categorys_dict[key].push(1);
    });


    categorys = [];
    for(key in categorys_dict) {
        object = {
            'title': key,
            'size': categorys_dict[key].length,
        }
        categorys.push(object);
    }
    return categorys;
}
