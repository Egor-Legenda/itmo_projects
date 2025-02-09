export function Profile() {
    return (
        <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Scientist" />
    );
}

export function Gallery() {
    return (
        <section>
            <h1>Amazing scientists</h1>
            <Profile />
            <Profile />
        </section>
    );
}
