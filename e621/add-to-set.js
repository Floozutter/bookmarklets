(() => {
    const set_id = "0";
    const post_id = document.querySelector("meta[name='post-id']").content;
    $.ajax({
        type: "POST",
        url: `/post_sets/${set_id}/add_posts.json`,
        data: {post_ids: [post_id]},
    });
})();
