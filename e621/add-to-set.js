(() => {
    const set_id = "";
    const post_id = document.querySelector("meta[name='post-id']").content;
    $.ajax({
        type: "POST",
        url: `/post_sets/${set_id}/add_posts.json`,
        data: {post_ids: [post_id]},
        success: () => { alert("added. uwu"); },
        error: () => { alert("error! ono"); },
    });
})();
