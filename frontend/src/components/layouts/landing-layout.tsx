import React, { ReactNode } from "react"
import Header from "../ui/header";
import Footer from "../ui/footer";

interface LandingLayoutProps {
    children: ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-full">
            <Header />
                <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    )
}

export default LandingLayout;