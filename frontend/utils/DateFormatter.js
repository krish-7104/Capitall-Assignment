export const dataFormatter = (time) => {
    const now = new Date();
    const date = new Date(time);
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        if (days === 1) return "yesterday";
        if (days < 7) return `${days} days ago`;
        return `${Math.floor(days / 7)} weeks ago`;
    }

    if (hours > 0) {
        if (hours === 1) return "1 hour ago";
        return `${hours} hours ago`;
    }

    if (minutes > 0) {
        if (minutes === 1) return "1 minute ago";
        return `${minutes} minutes ago`;
    }

    return "just now";
};