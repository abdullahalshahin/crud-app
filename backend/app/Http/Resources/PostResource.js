const post_data = (data, req) => {
    const created_at = data.created_at
        ? new Date(data.created_at).toLocaleString()
        : null;

    return {
        id: data.id,
        title: data.title || "", 
        text: data.text || "",
        created_at: created_at,
    };
}

module.exports = {
    post_data
}
