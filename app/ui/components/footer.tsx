export default function Footer() {
    return (
        <div className="flex flex-col w-full bg-slate-500 items-center justify-center min-h-16 mt-15 text-white p-12 gap-4">
            <img src="logo.svg" className="size-16 lg:size-24"/>
            <div className="grid grid-cols-3 gap-8">
                <a href="https://www.linkedin.com/in/diegobugarin" target="_blank">
                    <div className="rounded-full border-4 p-1">
                        <img src="linkedin.svg" className="size-5"/>
                    </div>
                </a>
                <a href="https://github.com/Bugest02" target="_blank">
                    <div className="rounded-full border-4 p-1">
                        <img src="github.svg" className="size-5"/>
                    </div>
                </a>
                <a href="mailto:buga_mty@hotmail.com">
                    <div className="rounded-full border-4 p-1">
                        <img src="email.svg" className="size-5"/>
                    </div>
                </a>
            </div>
        </div>
    );
}
  

