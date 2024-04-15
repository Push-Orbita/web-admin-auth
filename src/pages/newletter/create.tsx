import { useState } from "react";
import { DashboardLayout } from "../../layout/DashboardLayout"
import { FormNewsletter } from "./components/FormNewsletter"

const NewsLetterCreate = () => {
    const [visible, setVisible] = useState<boolean>(true);
    return (
        <DashboardLayout>
           <div className="m-0">
                    <div className="col-12">
                        <div className="card">
                            <FormNewsletter setVisible={setVisible} />
                        </div>
                    </div>
                </div>
        </DashboardLayout>
    )
}

export default NewsLetterCreate