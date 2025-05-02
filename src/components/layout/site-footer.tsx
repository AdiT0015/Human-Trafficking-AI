import React from 'react';

const SiteFooter = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 text-center mt-12">
      <p>&copy; {new Date().getFullYear()} GuardianAI. All rights reserved.</p>
    </footer>
  );
};

export default SiteFooter;
