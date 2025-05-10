const InternshipForm = ({ onSubmit, initialData = {} }) => {
      const [formData, setFormData] = React.useState({
        jobTitle: initialData.jobTitle || '',
        companyName: initialData.companyName || '',
        duration: initialData.duration || '',
        isPaid: initialData.isPaid || false,
        salary: initialData.salary || '',
        skills: initialData.skills || [],
        description: initialData.description || '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = () => {
        const skillsArray = formData.skills.split(',').map(skill => skill.trim());
        onSubmit({ ...formData, skills: skillsArray });
      };

      return (
        <div className="space-y-4">
          <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
          <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
          <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange} />
          <div>
            <label>Paid</label>
            <select name="isPaid" value={formData.isPaid} onChange={(e) => setFormData({ ...formData, isPaid: e.target.value === 'true' })} className="border rounded p-2 w-full">
              <option value="false">Unpaid</option>
              <option value="true">Paid</option>
            </select>
          </div>
          {formData.isPaid && <Input label="Salary" name="salary" value={formData.salary} onChange={handleChange} />}
          <Input label="Skills (comma-separated)" name="skills" value={formData.skills.join(', ')} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
          <textarea name="description" value={formData.description} onChange={handleChange} className="border rounded p-2 w-full" placeholder="Job Description"></textarea>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </div>
      );
    };