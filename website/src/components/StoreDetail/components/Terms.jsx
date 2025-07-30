// TermsContent.jsx
import React from "react";

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-lg mb-1">{title}</h3>
    <div className="text-sm text-gray-700 space-y-1">{children}</div>
  </div>
);

const Terms = ({ extraClause }) => {
  return (
    <div className="text-[14px] leading-5">
      <h2 className="text-center text-xl font-bold mb-1">
        Terms and Conditions for Subscribing to Our Shop
      </h2>
      <p className="text-center italic mb-4">Last Updated: July 29, 2025</p>
      <p>
        These Terms and Conditions govern your subscription to this shop. By
        subscribing, you agree to these Terms and Conditions, which define the
        scope of content you may access and how the shop provides updates to
        subscribers.
      </p>
      <Section title="Purpose of the Subscription">
        <p>
          The subscription allows you to stay informed about the shop’s updates,
          such as new collections, product launches, or other relevant shop
          activities. It is designed to enhance your experience with our shop
          within the platform.
        </p>
      </Section>
      <Section title="Eligibility">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            You must have an active account on the platform where the shop is
            hosted.
          </li>
          <li>
            You must be of legal age to use this service in your jurisdiction.
          </li>
          <li>
            The subscription is intended for personal, non-commercial use only.
          </li>
        </ul>
      </Section>
      <Section title="What You Can Expect from Us">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            We will provide timely updates related to our shop (e.g., product
            launches, service changes).
          </li>
          <li>
            We will strive to ensure that the content we provide is accurate and
            relevant to our shop.
          </li>
          <li>
            We will not request or require any personal information beyond what
            is already part of your platform account.
          </li>
        </ul>
      </Section>
      <Section title="Your Responsibilities as a Subscriber">
        <p>By subscribing, you agree to:</p>
        <ul className="list-disc pl-5 space-y-1">
          {/* <li>
            Use subscription content only for personal purposes and not
            redistribute it without permission.
          </li> */}
          <li>
            Refrain from abusive, unlawful, or disruptive behavior toward the
            shop or its content.
          </li>
          <li>
            Respect any intellectual property rights associated with the shop’s
            content.
          </li>
          {extraClause && <li>{extraClause}</li>}
        </ul>
      </Section>
      <Section title="Limitations">
        <p>
          While we aim to provide accurate and up-to-date information, we do not
          guarantee that all content will be error-free or continuously
          available.
        </p>
      </Section>
      <Section title="Cancellation">
        <p>
          You may unsubscribe at any time through your account settings. Once
          you unsubscribe, you will no longer receive updates from our shop.
        </p>
      </Section>
      <Section title="Changes to These Terms">
        <p>
          We may update these Terms periodically to reflect changes in our
          operations or offerings. Continued subscription after such updates
          constitutes acceptance of the revised Terms.
        </p>
      </Section>
      <Section title="Contact Information">
        <p>
          If you have questions or concerns about these Terms, please contact
          us:
        </p>
        <p>
          Support Team <br />
          Email: support@shopsphere.com <br />
          Phone: +1-800-123-4567
        </p>
      </Section>
    </div>
  );
};

export default Terms;
