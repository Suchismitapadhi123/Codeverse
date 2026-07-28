import pypdf
import os

pdf_files = [
    "C++ Cheatsheet.pdf",
    "DSA_CompleteNotes.pdf",
    "JS_Chapterwise_Notes.pdf",
    "The Ultimate Python Handbook.pdf"
]

base_dir = r"C:\Users\SUCHISMITA\.gemini\antigravity\scratch\codeverse"
report_path = os.path.join(base_dir, "pdf_report_detailed.txt")

with open(report_path, "w", encoding="utf-8") as f:
    f.write("=== DETAILED PDF REPORT ===\n\n")
    for pdf in pdf_files:
        path = os.path.join(base_dir, pdf)
        f.write(f"File: {pdf}\n")
        if not os.path.exists(path):
            f.write("STATUS: NOT FOUND\n\n")
            continue
        try:
            reader = pypdf.PdfReader(path)
            num_pages = len(reader.pages)
            f.write(f"Total Pages: {num_pages}\n")
            
            non_empty_pages = []
            for idx, page in enumerate(reader.pages):
                text = page.extract_text()
                if text and text.strip():
                    non_empty_pages.append((idx + 1, text))
            
            f.write(f"Pages with text: {len(non_empty_pages)} / {num_pages}\n")
            if non_empty_pages:
                f.write(f"First page with text is Page {non_empty_pages[0][0]}\n")
                f.write("--- Sample text from that page ---\n")
                f.write(non_empty_pages[0][1][:1500])
                f.write("\n")
                
                # Let's list some headers or sample lines from other pages
                f.write("--- Selected Snippets from other pages ---\n")
                for page_num, text in non_empty_pages[1:10]:
                    first_line = text.strip().split('\n')[0]
                    f.write(f"Page {page_num}: {first_line[:100]}\n")
            else:
                f.write("WARNING: No text could be extracted from ANY page. The PDF might contain only scanned images/handwritten notes.\n")
            f.write("=======================================\n\n")
        except Exception as e:
            f.write(f"ERROR: {str(e)}\n\n")

print("Detailed report written to", report_path)
