import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";

const PersonalInformation = () => (
    <div className="nuron-information">
        <div className="profile-form-wrapper">
            <div className="input-two-wrapper mb--15">
                <div className="first-name half-wid">
                    <label htmlFor="contact-name" className="form-label">
                        First Name
                    </label>
                    <input
                        name="contact-name"
                        id="contact-name"
                        type="text"
                        value="Mr."
                        onChange={(e) => e}
                    />
                </div>
                <div className="last-name half-wid">
                    <label htmlFor="contact-name-last" className="form-label">
                        Last Name
                    </label>
                    <input
                        name="contact-name"
                        id="contact-name-last"
                        type="text"
                        value="Sunayra"
                        onChange={(e) => e}
                    />
                </div>
            </div>
            <div className="email-area">
                <label htmlFor="Email" className="form-label">
                    Edit Your Email
                </label>
                <input
                    name="email"
                    id="Email"
                    type="email"
                    value="example@gmail.com"
                    onChange={(e) => e}
                />
            </div>
        </div>
        <div className="edit-bio-area mt--30">
            <label htmlFor="Discription" className="form-label">
                Edit Your Bio
            </label>
            <textarea
                id="Discription"
                value="Hello, I am Alamin, A Front-end Developer..."
                onChange={(e) => e}
            >
                Hello, I am Alamin, A Front-end Developer...
            </textarea>
        </div>
        <div className="button-area save-btn-edit">
            <Button className="mr--15" color="primary-alta" size="medium">
                Cancel
            </Button>
            <Button size="medium">Save</Button>
        </div>
    </div>
);

export default PersonalInformation;
