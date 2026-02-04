
export default function AboutHost() {
    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden border border-border shadow-xl">
                                <img
                                    src="emam.jpeg"
                                    alt="Host"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 text-center md:text-left flex-1">
                            <h2 className="text-3xl font-bold text-foreground">About Emmanuel</h2>
                            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    I believe AI is creating  a lot of new opportunities for those who take the time to learn it. My experience comes from regular experimentation and building practical automation systems, websites, and SaaS applications for fun.
                                </p>
                                <p>
                                    I created this webinar to share what I’ve learned and to help people understand how to use AI tools thoughtfully and effectively. Whether you’re just getting started or looking to make better use of what you already know, the goal is the same: reduce confusion, remove unnecessary fear, and help you navigate a changing landscape with confidence.
                                </p>
                                <p>
                                    check out my <a className="underline text-primary hover:text-primary" href="https://www.easetranslate.com/" target="_blank" rel="noopener noreferrer">Transalate app</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
