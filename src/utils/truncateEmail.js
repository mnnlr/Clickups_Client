const truncateEmail = (email, maxLength = 15) => {
    if (email.length <= maxLength) return email;
    const [localPart, domain] = email.split("@");
    const truncatedLocalPart = localPart.length > maxLength - 3 ? localPart.slice(0, maxLength - 3) + "..." : localPart;
    return `${truncatedLocalPart}@${domain}`;
};

export default truncateEmail;
